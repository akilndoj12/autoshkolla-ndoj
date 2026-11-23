#!/bin/sh
# Përditëson numrin e versionit te index.html që shfletuesit të marrin skedarët e rinj.
V=$(date +%Y%m%d%H%M)
sed -i -E "s#(assets/(css|js)/[a-z]+\.(css|js))(\?v=[0-9]+)?\"#\1?v=$V\"#g" index.html
echo "Versioni: $V"
