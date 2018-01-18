#!/bin/bash
source=$(<src/chickenhouse.ino)
env=$(<env)
for e in $env; do
    set -- `echo $e | tr '=' ' '`
    echo "${source/$1/$2}" >> source
    echo $source
done

mkdir -p dist
echo "$source" >> output
