export async function getSortedPostsData() {
    // Instead of the file system,
    // fetch post data from an external API endpoint
    const res = await fetch('..');
    // const res = {"id":1,"name":"one","detail":"01"}
    return res.json();
}