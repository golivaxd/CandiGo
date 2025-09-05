'use client';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";

interface Article {
  title: string | { id: string; name: string };
  description?: string;
  url?: string;
  source?: string;
  urlToImage?: string;
  publishedAt?: string;
}

export default function NewsCarousel({ articles }: { articles: Article[] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000
  };

  return (
    <div className="news-carousel-container">
      <Slider {...settings}>
        {articles.map((n, i) => {
          const title =
            typeof n.title === 'object' ? n.title.name : n.title;
          return (
            <div key={i} className="news-slide" onClick={() => window.open(n.url, "_blank")}>
              {n.urlToImage && (
                <img src={n.urlToImage} alt={title} className="news-image" />
              )}
              <h3>{title}</h3>
              {n.publishedAt && (
                <small>{new Date(n.publishedAt).toLocaleDateString("es-MX")}</small>
              )}
              {n.description && <p>{n.description}</p>}
              {n.source && <small> — {n.source}</small>}
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

