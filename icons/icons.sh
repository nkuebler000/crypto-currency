#!/bin/bash
pattern="^[A-Za-z\-].+\-alt.png$"

for file in ./*; do
	if [[ ${file##*/} =~ $pattern ]]; then

		newFileName=${file##*/}
		echo icons[\'${newFileName/-alt.png/}\'] = require\(\'\.\/$newFileName\'\)\;;
	fi
done

