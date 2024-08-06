#!/bin/bash
docker build --pull -t annotator ../../
docker run -d -p 3000:3000 annotator 
