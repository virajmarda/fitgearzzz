import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Calendar, User, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { getPostBySlug, getRelatedPosts } from '../data/blogData';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="blog-post-not-found">
        <div className="container">
          <h1>Article Not Found</h1>
          <p>The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post.id);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const renderContent = (contentItem) => {
    switch (contentItem.type) {
      case 'paragraph':
        return <p key={Math.random()} className="article-paragraph">{contentItem.text}</p>;
      case 'heading':
        return <h2 key={Math.random()} className="article-heading">{contentItem.text}</h2>;
      case 'list':
        return (
          <ul key={Math.random()} className="article-list">
            {contentItem.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="blog-post-page">
      {/* Hero Section */}
      <div className="post-hero" style={{ backgroundImage: `url(${post.image})` }}>
        <div className="post-hero-overlay">
          <div className="container">
            <button className="back-button" onClick={() => navigate('/blog')}>
              <ArrowLeft size={20} /> Back to Blog
            </button>
            <div className="post-hero-content">
              <span className="post-category-badge">{post.category}</span>
              <h1 className="post-hero-title">{post.title}</h1>
              <div className="post-meta">
                <div className="meta-item">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                </div>
                <div className="meta-item">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Article */}
      <div className="post-content-wrapper">
        <div className="container">
          <div className="post-layout">
            {/* Main Content */}
            <article className="post-main-content">
              <div className="post-excerpt">
                <p>{post.excerpt}</p>
              </div>

              <div className="article-content">
                {post.content.map((item) => renderContent(item))}
              </div>

              {/* Author Box */}
              <div className="author-box">
                <div className="author-info">
                  <div className="author-avatar">
                    <User size={40} />
                  </div>
                  <div>
                    <h4>About {post.author}</h4>
                    <p>{post.authorBio}</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="post-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    <Tag size={14} /> {tag}
                  </span>
                ))}
              </div>

              {/* Share Section */}
              <div className="post-share">
                <button className="share-button" onClick={handleShare}>
                  <Share2 size={20} /> Share This Article
                </button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="post-sidebar">
              <div className="sidebar-sticky">
                {/* Table of Contents */}
                <div className="sidebar-widget">
                  <h3>In This Article</h3>
                  <ul className="toc-list">
                    {post.content
                      .filter((item) => item.type === 'heading')
                      .map((heading, idx) => (
                        <li key={idx}>
                          <a href={`#${heading.text.toLowerCase().replace(/\s+/g, '-')}`}>
                            {heading.text}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Newsletter */}
                <div className="sidebar-widget newsletter-widget">
                  <h3>Stay Updated</h3>
                  <p>Get the latest fitness tips delivered to your inbox.</p>
                  <form className="newsletter-form">
                    <input type="email" placeholder="Your email" />
                    <button type="submit" className="btn-primary">Subscribe</button>
                  </form>
                </div>
              </div>
            </aside>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="related-posts-section">
              <h2>Related Articles</h2>
              <div className="related-posts-grid">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="related-post-card"
                  >
                    <div 
                      className="related-post-image"
                      style={{ backgroundImage: `url(${relatedPost.image})` }}
                    />
                    <div className="related-post-content">
                      <span className="related-post-category">{relatedPost.category}</span>
                      <h3>{relatedPost.title}</h3>
                      <div className="related-post-meta">
                        <span><Clock size={14} /> {relatedPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
