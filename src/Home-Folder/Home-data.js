var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

//Image carousl...
const images = [
    {
        id: "31964",
        image: "https://cdn.pixabay.com/photo/2021/01/31/07/14/my-hero-academia-5966057__480.jpg"
    },
    {
        id: "4181",
        image: "https://images.fanart.tv/fanart/clannad-after-story-5950a92af0055.jpg"
    },
    {
        id: "23273",
        image: "https://c4.wallpaperflare.com/wallpaper/1015/255/713/your-lie-in-april-wallpaper-preview.jpg"
    },
    {
        id: "9253",
        image: "https://wallpapercave.com/wp/wp1858916.jpg"
    },
    {
        id: "21",
        image: "https://images.alphacoders.com/109/1099923.jpg"
    }
]

//Manhwa carousel images...
const manhwa = [
    {
        id: "121496",
        image: "https://images4.alphacoders.com/106/1061827.png"
    },
    {
        id: "132214",
        image: "https://w0.peakpx.com/wallpaper/384/641/HD-wallpaper-omniscient-reader-viewpoint-omniscient-readers-viewpoint-readers-manhwa-omniscient-reader-s-viewpoint.jpg"
    },
    {
        id: "121269",
        image: "https://a-static.besthdwallpaper.com/who-made-me-a-princess-claude-de-alger-obelia-diana-wallpaper-2160x1440-72015_40.jpg"
    },
    {
        id: "146966",
        image: "https://cdn.wallpapersafari.com/32/10/nm5BDt.jpg"
    },
    {
        id: "147863",
        image: "https://m7y7b3u4.rocketcdn.me/wp-content/uploads/2022/11/nano-machine-recap4.v1-1024x638-1.jpg"
    },
    {
        id: "147324",
        image: "https://wallpaperaccess.com/full/7054299.jpg"
    }
]

export {settings, images, manhwa}