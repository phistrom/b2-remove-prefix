/**
 * When requesting a file, adds the URL bits necessary in the background to get
 * it from a public B2 bucket.
 *
 * Also modifies requests for .boot, .cfg, and .pub to return the Content-Type
 * of `text/plain` (instead of the usual `application/octet-stream` or
 * `application/x-mspublisher`) that B2 would set for you automatically.
 *
 * For example:
 * You have a proxied CNAME `i.example.com` on CloudFlare pointing
 * to `f001.backblazeb2.com`.
 * To access `/test.txt` in the root of the bucket called `example-bucket`, the
 * URL would normally be `https://i.example.com/file/example-bucket/test.txt`
 * Installing this worker makes it so that the URL becomes simply
 * `https://i.example.com/test.txt`.
 */
async function handleRequest(request) {
    let url = new URL(request.url)
    // make sure you set B2_BUCKET_NAME as an environment variable
    url.pathname = `/file/${B2_BUCKET_NAME}${url.pathname}`
    let modified = new Request(url.toString(), request)
    let response = await fetch(modified, {
        cf: { cacheTtl: parseInt(CF_CACHE_TTL) }
    })
    let respURL = new URL(response.url)

    // customize Content-Type headers for various extensions here if you like
    if (/\.(pub|boot|cfg)$/.test(respURL.pathname)) {
        response = new Response(response.body, response)
        response.headers.set('Content-Type', 'text/plain')
    }
    return response
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
