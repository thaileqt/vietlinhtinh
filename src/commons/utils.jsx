const genre_name_mapper = {
    "ACTION": "Hành Động",
    "ADULT": "Người Lớn",
    "ADVENTURE" : "Phiêu Lưu",
    "COMEDY": "Hài Hước",
    "DRAMA": "Drama",
    "BOYS_LOVE": "Đam Mỹ",
    "DOUJINSHI" : "Doujinshi",
    "ECCHI": "Ecchi",
    "FANFICTION": "Fanfiction",
    "FANTASY": "Fantasy",
    "GAME": "Game",
    "GENDER_BENDER": "Gender Bender", // 10
    "GIRLS_LOVE": "Girls Love",
    "HAREM": "Harem",
    "HISTORICAL": "Lịch Sử",
    "HORROR": "Kinh Dị",
    "ISEKAI": "Isekai",
    "JOSEI": "Josei",
    "MARTIAL_ARTS": "Võ Thuật",
    "MATURE": "Trưởng Thành",
    "MECHA": "Mecha",
    "MYSTERY": "Bí Ẩn",  // 20
    "PSYCHOLOGICAL": "Tâm Lý Học",
    "ROMANCE": "Lãng Mạn",
    "SCHOOL_LIFE": "Trường Học",
    "SCI_FI": "Khoa Học Viễn Tưởng",
    "SEINEN": "Seinen",
    "SHOUNEN": "Shounen",
    "SHOUJO": "Shoujo",
    "SLICE_OF_LIFE": "Đời Thường",
    "SPORTS": "Thể Thao",
    "SUPERNATURAL": "Siêu Nhiên", // 30
    "TRAGEDY": "Bi Kịch",
    "XIANXIA": "Tiên Hiệp",
    "WUXIA": "Kiếm Hiệp",
    "XUANHUAN": "Huyền Huyễn",
    "CULTIVATION": "Tu Tiên",
    "URBAN": "Đô Thị",
    "ANCIENT": "Cổ Đại",
    "TRANSMIGRATION": "Xuyên Không",
    "LITRPG": "LitRPG",
};

function formatDate(createdAt) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(createdAt).toLocaleDateString(undefined, options);
}

function timeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    
    if (interval >= 1) {
        return `${interval} year${interval === 1 ? '' : 's'} ago`;
    }
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return `${interval} tháng trước`;
    }
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return `${interval} ngày trước`;
    }
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return `${interval} giờ trước`;
    }
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return `${interval} phút trước`;
    }
    
    return 'Mới cập nhật';
}



const utils = {
    genre_name_mapper,
    timeSince,
    formatDate,
};

export default utils;