#!/bin/bash
# Transcode RTMP input to HLS output

INPUT=$1
OUTPUT_DIR="./public/live"
mkdir -p $OUTPUT_DIR

ffmpeg -i "$INPUT"   -c:v libx264 -preset veryfast -maxrate 3000k -bufsize 6000k   -c:a aac -b:a 160k -ac 2   -f hls -hls_time 4 -hls_list_size 10 -hls_flags delete_segments   "$OUTPUT_DIR/stream.m3u8"
