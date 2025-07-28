import { Link } from 'react-router-dom';
import { useBlog } from '../hooks/useApi';
import PropTypes from 'prop-types';

const BlogPage = () => {
  const { posts, loading, error } = useBlog();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Erreur de chargement</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const featuredPosts = posts.filter(post => post.featured && post.published);
  const regularPosts = posts.filter(post => !post.featured && post.published);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6" data-aos="fade-up">
            Blog Kazisafi
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Découvrez nos dernières réalisations, conseils d&apos;entretien et actualités
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8" data-aos="fade-up">
              À la Une
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <FeaturedPostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8" data-aos="fade-up">
            Derniers Articles
          </h2>
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <BlogPostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun article disponible</h3>
              <p className="text-gray-600">Les articles seront bientôt disponibles.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const FeaturedPostCard = ({ post, index }) => {
  return (
    <article 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
      data-aos="fade-up"
      data-aos-delay={index * 200}
    >
      <div className="md:flex">
        <div className="md:w-1/2">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8">
          <div className="flex items-center mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              À la Une
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-6 line-clamp-3">
            {post.excerpt || post.content.substring(0, 150) + '...'}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('fr-FR')}</span>
            </div>
            <Link
              to={`/blogs/${post.id}`}
              className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
            >
              Lire la suite
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

FeaturedPostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    excerpt: PropTypes.string,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publishedAt: PropTypes.string,
    createdAt: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired
};

const BlogPostCard = ({ post, index }) => {
  const tags = post.tags ? JSON.parse(post.tags) : [];

  return (
    <article 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="relative">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('fr-FR')}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt || post.content.substring(0, 120) + '...'}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, tagIndex) => (
              <span 
                key={tagIndex}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Par {post.author}
          </span>
          <Link
            to={`/blogs/${post.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Lire plus
          </Link>
        </div>
      </div>
    </article>
  );
};

BlogPostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    excerpt: PropTypes.string,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publishedAt: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    tags: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired
};

export default BlogPage;
