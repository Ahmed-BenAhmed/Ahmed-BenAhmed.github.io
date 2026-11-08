for f in post_*; do
  # Extract post id from filename (between 'post_' and first '.')
  postid=$(echo "$f" | sed -E 's/post_([^\.]+).*/\1/')
  mv "$f" "${postid}.png"
done