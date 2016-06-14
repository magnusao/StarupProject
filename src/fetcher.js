export const RECENT_PATH = "?s=recent";
export const POPULAR_PATH = "?s=popular";
export const DEFAULT_PATH = "?s=default";
export const RECENT = "RECENT";
export const POPULAR = "POPULAR";
export const DEFAULT = "DEFAULT";

export const fetchImages = (sorting) => {
  let sortPath;
  switch(sorting){
    case RECENT: sortPath = RECENT_PATH; break;
    case POPULAR: sortPath = POPULAR_PATH; break;
    case DEFAULT: sortPath = DEFAULT_PATH; break;
  }

	var url = `http://localhost:3000/imgs${sortPath}`;
  console.log(url)

  return fetch(url).then(function (response) {
  	  return response.json().then(function (json) {
      return json.map(
        (d) => d.url
      );
    })
  })
};

