'use client';

import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Article {
  title: string | { id: string; name: string };
  description?: string;
  url?: string;
  source?: string | { id: string; name: string };
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
        {articles.map((article, i) => {
          // Title seguro
          const title =
            typeof article.title === 'object'
              ? article.title.name ?? JSON.stringify(article.title)
              : String(article.title ?? '');

          // Source seguro
          const source =
            article.source && typeof article.source === 'object'
              ? article.source.name ?? JSON.stringify(article.source)
              : String(article.source ?? '');

          return (
            <div
              key={i}
              className="news-slide"
              onClick={() => article.url && window.open(article.url, "_blank")}
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={title}
                  className="news-image"
                />
              )}
              <h3>{title}</h3>
              {article.publishedAt && (
                <small>{new Date(article.publishedAt).toLocaleDateString("es-MX")}</small>
              )}
              {article.description && <p>{article.description}</p>}
              {source && <small> — {source}</small>}
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
