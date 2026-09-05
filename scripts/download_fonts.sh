#!/bin/bash

# Rumuze Font Downloader
# Downloads required Google Fonts in woff2 format to public/fonts

mkdir -p public/fonts
cd public/fonts

echo "Downloading Inter..."
curl -O https://gwfh.mranftl.com/api/fonts/inter/v13/latin-regular.woff2 -o inter-v13-latin-regular.woff2
curl -O https://gwfh.mranftl.com/api/fonts/inter/v13/latin-500.woff2 -o inter-v13-latin-500.woff2
curl -O https://gwfh.mranftl.com/api/fonts/inter/v13/latin-600.woff2 -o inter-v13-latin-600.woff2
curl -O https://gwfh.mranftl.com/api/fonts/inter/v13/latin-700.woff2 -o inter-v13-latin-700.woff2

echo "Downloading Montserrat..."
curl -O https://gwfh.mranftl.com/api/fonts/montserrat/v26/latin-700.woff2 -o montserrat-v26-latin-700.woff2
curl -O https://gwfh.mranftl.com/api/fonts/montserrat/v26/latin-800.woff2 -o montserrat-v26-latin-800.woff2

echo "Downloading Cairo..."
curl -O https://gwfh.mranftl.com/api/fonts/cairo/v28/arabic-regular.woff2 -o cairo-v28-arabic-regular.woff2
curl -O https://gwfh.mranftl.com/api/fonts/cairo/v28/arabic-600.woff2 -o cairo-v28-arabic-600.woff2
curl -O https://gwfh.mranftl.com/api/fonts/cairo/v28/arabic-700.woff2 -o cairo-v28-arabic-700.woff2
curl -O https://gwfh.mranftl.com/api/fonts/cairo/v28/arabic-900.woff2 -o cairo-v28-arabic-900.woff2

echo "Fonts downloaded successfully!"
echo "Don't forget to uncomment the @font-face rules in src/styles/fonts.css"
