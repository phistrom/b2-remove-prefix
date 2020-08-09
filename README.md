# B2 Remove Prefix Worker
A CloudFlare worker script that removes the `/file/{bucket-name}/` portion of
the URL when access a B2 Bucket.

 - Works with the free tier of CloudFlare and CloudFlare Workers
 - It's still free egress from your B2 bucket
 - No performance penalty, just prettier URLs for your B2 assets
 - Doesn't expose the name of your B2 bucket in the URL

## Why
If you followed [this guide to set up a CloudFlare domain in front of 
Backblaze B2](https://help.backblaze.com/hc/en-us/articles/217666928-Using-Backblaze-B2-with-the-Cloudflare-CDN),
you may have been disappointed by the length of the URL.

For instance, let's say you set up `i.example.com` as a proxied CNAME on
CloudFlare in front of `f001.backblazeb2.com`. Then for you to download a file
called `/test.txt` in the root of the bucket `example-bucket`, the URL would be
`https://i.example.com/file/example-bucket/test.txt`. By putting this Worker
script in front of it, your URL becomes a simple
`https://i.example.com/test.txt`.

## License
The Unlicense
