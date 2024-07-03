#!/bin/bash
# PSMN: $Id$
#
# based on sftp_img_stats.sh

# set -x

#exit 0

deactivate
source ~/python/bin/activate
python inclure_contenu.py
python filter_news.py
mkdocs build 
