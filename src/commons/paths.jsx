const paths = {
    home: '/',
    login: '/login',
    register: '/register',
    profile(username) {
        return `/profile/${username}`;
    },

    series(slug) {
        return `/series/${slug}`;
    },
    chapter(seriesSlug, chapterNumber) {
        return `/series/${seriesSlug}/${chapterNumber}`;
    },

    searchByGenre(genre) {
        return `/genre/${genre}`;
    },

    searchResults(keyword) {
        return `/search?keyword=${keyword}`;
    },

    compose: {
        allChapter(slug) {
            return `/compose/all-chapter/${slug}`;
        },

        addChapter(slug) {
            return `/compose/add-chapter/${slug}`;
        },

        editChapter(slug, chapterNumber) {
            return `/compose/edit-chapter/${slug}/${chapterNumber}`;
        },

        addSeries() {
            return `/compose/add-series`;
        },

        editSeries(slug) {
            return `/compose/edit-series/${slug}`;
        }
    },
};

export default paths;
