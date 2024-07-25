#!/bin/bash
docker build --pull -t annotator ../../
docker run -d -p 3003:3003 annotator 
