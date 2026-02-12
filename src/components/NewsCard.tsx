import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

export default function NewsCard({ id, title, excerpt, image, date }: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/news/${id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Date Badge */}
          <div className="absolute bottom-4 left-4 bg-[#F5B800] text-white px-3 py-1 rounded-full text-sm font-medium">
            {date}
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-[#F5B800] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {excerpt}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
