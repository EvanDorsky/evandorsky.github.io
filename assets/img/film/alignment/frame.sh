#!/bin/bash

for n in {1..50}
do
convert -gravity Center -extent 2100x2100 "$n"_tn.jpg bordered/"$n"_tn.jpg
exiftool -overwrite_original -AllDates=now bordered/"$n"_tn.jpg
done
