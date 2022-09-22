<h1 align="center">Website</h1>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/TruncatedDinosour/website?color=red&style=flat-square">
  <img src="https://img.shields.io/github/repo-size/TruncatedDinosour/website?color=red&style=flat-square">
  <img src="https://img.shields.io/github/issues/TruncatedDinosour/website?color=red&style=flat-square">
  <img src="https://img.shields.io/github/stars/TruncatedDinosour/website?color=red&style=flat-square">
</p>

<p align="center">
    <a href="https://app.netlify.com/sites/ari-web/deploys">
        <img alt="Netlify Status" src="https://api.netlify.com/api/v1/badges/4ac67547-6444-4c67-9a54-c7f8fb28427b/deploy-status"/> </a> </p>

### [My website's](https://www.ari-web.xyz/) source code.

# Customising when self-hosting

1. Clone the repository: `git clone https://ari-web.xyz/git ari-web`
2. Enter the directory: `cd ari-web`
3. See the `/content/styles/config` and `/content/js/config` directories.
4. Open it in live server: `python3 -m http.server 5500`
5. Go to http://0.0.0.0:5500/ in your browser
6. Edit all stuff that is `ARI-WEB-SPECIFIC` in [netlify.toml](/netlify.toml)
7. Publish on [netlify](https://netlify.com/)

# API hashes

If you want to call to a very expensive API it might become
slow, so there's hashes for them, they are sha256 hashes of
those JSON files in the api

So what you do, replace all `.` in the API name with \_,
then make the request to `/api_hash/....txt` and you will
get the hash, for example: <https://www.ari-web.xyz/api_hash/apis_json.txt>

# Usage API

The [usage api](https://www.ari-web.xyz/api/usage.json)
has all the statistics I get from netlify, it serves as
an archive and growth monitor

Schema:

```json
{
    "<YYYY-MM-DD>": {
        "total": <total bandwidth used in MB>,
        "top": {
            "<top usage site 1>": <total bandwidth used in MB>,
            "<top usage site 2>": <total bandwidth used in MB>,
            "<top usage site 3>": <total bandwidth used in MB>
        }
    }
}
```

The date is the day I added those stats, total is total
bandwidth used up to that point, top is the top 3 site's
usage and its keys are the (sub)domain names and the values
of those keys are the used bandwidth out of the total

The bandwidth keys are all floats for easy parsing, they
represent the bandwidth used in MB

The top sites will most likely not have the total bandwidth
fully used, so as a measure you can use this formula to calculate
how much per avg sites are using:

```py
(data["<YYYY-MM-DD>"]["total"] - sum(data["<YYYY-MM-DD>"]["top"].values())) / (len(ari_web_sites) - 3)
```

# Subdomains

-   https://www.ari-web.xyz/ (source: https://ari-web.xyz/git)
-   https://files.ari-web.xyz/ (source: https://files.ari-web.xyz/git)
-   https://blog.ari-web.xyz/ (source: https://blog.ari-web.xyz/git)
-   https://legacy.blog.ari-web.xyz/ (source: https://legacy.blog.ari-web.xyz/git)
-   https://school.ari-web.xyz/ (source: proprietary (I don't want people snooping on my homework lol))
-   https://user.ari-web.xyz/ (source: https://user.ari-web.xyz/git)
-   https://3.ari-web.xyz/ (source: https://3.ari-web.xyz/git)
