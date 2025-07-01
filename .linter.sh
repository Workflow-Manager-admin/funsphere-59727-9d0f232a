#!/bin/bash
cd /home/kavia/workspace/code-generation/funsphere-59727-9d0f232a/funbase_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

