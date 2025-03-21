import he from 'he';


export const stripHtml = (str = "", maxLength = 0) => {
	if (!str) return "";
	str = str.replace(/<[^>]+>/ig, " ").trim();
	str = he.decode(str);
	if (maxLength > 0 && str.length > maxLength) {
		str = str.substring(0, maxLength) + "...";
	}
	return str;

}
