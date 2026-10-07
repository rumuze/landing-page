import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { fieldClass } from '../tools/toolStyles';
import { filterOptions, firstIndex, lastIndex, stepIndex, typeAheadIndex } from './selectLogic';

const LIST_MAX_HEIGHT = 256; // px, matches max-h-64
const TYPE_AHEAD_RESET_MS = 700;

/**
 * A drop-down list that looks the same in every browser, works with the keyboard and in both text
 * directions, and can search long lists (countries) in Arabic or English.
 *
 * options: [{ value, label, meta?, keywords?, disabled? }]. `meta` is shown at the end of the row in
 * its own left-to-right run (a dial code); `keywords` are extra words the search can match.
 *
 * `triggerClassName` replaces the default field look when a form has its own.
 *
 * Keyboard: Arrow keys, Home, End, Enter or Space to choose, Escape to close, letters to jump. With
 * `searchable` the letters go into a search box instead. Built to the ARIA collapsible listbox
 * pattern: the button is labelled by its label and its value, the open list takes the focus.
 */
const Select = ({
  id,
  value,
  options,
  onChange,
  placeholder = '',
  searchable = false,
  searchPlaceholder = '',
  noResults = '',
  invalid = false,
  disabled = false,
  triggerClassName,
  ...aria
}) => {
  const uid = useId();
  const listId = `${uid}-list`;
  const optionId = (index) => `${uid}-opt-${index}`;
  const root = useRef(null);
  const trigger = useRef(null);
  const list = useRef(null);
  const search = useRef(null);
  const typed = useRef({ text: '', timer: 0 });

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('down');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const visible = useMemo(() => (searchable ? filterOptions(options, query) : options), [searchable, options, query]);
  const selected = options.find((option) => option.value === value);

  useEffect(() => () => window.clearTimeout(typed.current.timer), []);

  // The list takes the focus when it opens, so the keyboard works inside it.
  useEffect(() => {
    if (open) (search.current ?? list.current)?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (open) document.getElementById(`${uid}-opt-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [open, active, uid]);

  const openList = useCallback(() => {
    if (disabled) return;
    const box = trigger.current.getBoundingClientRect();
    const needed = LIST_MAX_HEIGHT + (searchable ? 64 : 16);
    const below = window.innerHeight - box.bottom;
    setPlacement(below < needed && box.top > below ? 'up' : 'down');
    setQuery('');
    const at = options.findIndex((option) => option.value === value);
    setActive(at >= 0 ? at : Math.max(0, firstIndex(options)));
    setOpen(true);
  }, [disabled, options, searchable, value]);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) trigger.current?.focus();
  }, []);

  const choose = (option) => {
    if (!option || option.disabled) return;
    onChange(option.value);
    close();
  };

  const move = (index) => {
    if (index >= 0) setActive(index);
  };

  const onListKeyDown = (event) => {
    const { key } = event;
    if (key === 'ArrowDown') move(stepIndex(visible, active, 1));
    else if (key === 'ArrowUp') move(stepIndex(visible, active, -1));
    else if (key === 'Home') move(firstIndex(visible));
    else if (key === 'End') move(lastIndex(visible));
    else if (key === 'PageDown') move(Math.min(visible.length - 1, active + 8));
    else if (key === 'PageUp') move(Math.max(0, active - 8));
    else if (key === 'Enter' || (key === ' ' && !searchable)) choose(visible[active]);
    else if (key === 'Escape') close();
    else if (key === 'Tab') close(false);
    else if (!searchable && key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      window.clearTimeout(typed.current.timer);
      typed.current.text += key;
      typed.current.timer = window.setTimeout(() => {
        typed.current.text = '';
      }, TYPE_AHEAD_RESET_MS);
      move(typeAheadIndex(visible, typed.current.text, active));
      event.preventDefault();
      return;
    } else return;
    event.preventDefault();
  };

  const onTriggerKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      openList();
    }
  };

  // Leaving the component by any route other than its own parts closes the list.
  const onBlur = (event) => {
    if (open && !root.current?.contains(event.relatedTarget)) setOpen(false);
  };

  const onSearch = (event) => {
    const next = event.target.value;
    setQuery(next);
    setActive(Math.max(0, firstIndex(filterOptions(options, next))));
  };

  return (
    <div ref={root} className="relative" onBlur={onBlur}>
      <button
        ref={trigger}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={`${id}-label ${id}`}
        aria-invalid={invalid || undefined}
        {...aria}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onTriggerKeyDown}
        className={`${triggerClassName ?? fieldClass(invalid)} flex items-center justify-between gap-3 text-start ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      >
        <span className={`min-w-0 flex-1 truncate ${selected ? '' : 'text-slate-400 dark:text-gray-500'}`}>
          {selected ? selected.label : placeholder}
          {selected?.meta ? (
            <span dir="ltr" className="ms-2 inline-block text-sm text-slate-500 [unicode-bidi:isolate] dark:text-gray-400">
              {selected.meta}
            </span>
          ) : null}
        </span>
        <ChevronDown size={18} aria-hidden="true" className={`shrink-0 text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open ? (
        <div
          onKeyDown={onListKeyDown}
          className={`absolute start-0 z-40 w-max min-w-full max-w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border-2 border-slate-200 bg-white shadow-2xl dark:border-white/15 dark:bg-slate-900 ${
            placement === 'up' ? 'bottom-full mb-2 origin-bottom' : 'top-full mt-2 origin-top'
          } tool-pop`}
        >
          {searchable ? (
            <div className="flex items-center gap-2 border-b border-slate-200 px-3 dark:border-white/10">
              <Search size={16} aria-hidden="true" className="shrink-0 text-slate-400" />
              <input
                ref={search}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={visible.length ? optionId(active) : undefined}
                aria-label={searchPlaceholder}
                autoComplete="off"
                value={query}
                onChange={onSearch}
                placeholder={searchPlaceholder}
                className="h-11 w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus-visible:!outline-none dark:text-white"
              />
            </div>
          ) : null}
          <ul
            ref={list}
            id={listId}
            role="listbox"
            tabIndex={searchable ? undefined : -1}
            aria-labelledby={`${id}-label`}
            aria-activedescendant={!searchable && visible.length ? optionId(active) : undefined}
            className="max-h-64 overflow-y-auto p-1.5 focus-visible:!outline-none"
          >
            {visible.length === 0 ? (
              <li role="presentation" className="px-3 py-3 text-sm text-slate-500 dark:text-gray-400">
                {noResults}
              </li>
            ) : (
              visible.map((option, index) => {
                const isSelected = option.value === value;
                return (
                  <li
                    key={option.value}
                    id={optionId(index)}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled || undefined}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseMove={() => active !== index && !option.disabled && setActive(index)}
                    onClick={() => choose(option)}
                    className={`flex min-h-[2.5rem] cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                      option.disabled ? 'cursor-not-allowed opacity-40' : ''
                    } ${index === active ? 'bg-cyan/15 dark:bg-cyan/20' : ''} ${
                      isSelected ? 'font-semibold text-slate-950 dark:text-white' : 'text-slate-700 dark:text-gray-200'
                    }`}
                  >
                    <span className="min-w-0 flex-1 truncate">{option.label}</span>
                    {option.meta ? (
                      <span dir="ltr" className="shrink-0 text-xs text-slate-500 [unicode-bidi:isolate] dark:text-gray-400">
                        {option.meta}
                      </span>
                    ) : null}
                    <Check size={16} aria-hidden="true" className={`shrink-0 text-cyan-700 dark:text-cyan ${isSelected ? '' : 'invisible'}`} />
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Select;
