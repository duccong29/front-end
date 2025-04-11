"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, ChevronRight, Home } from "lucide-react";

interface Article {
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  readTime: string;
  date: string;
  image: string;
}

export default function FeaturedResidence() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const articles: Article[] = [
    {
      title: "The Things We Need To Check When We Want To Buy A House",
      author: {
        name: "Dianne Russell",
        avatar: "/placeholder.svg",
      },
      readTime: "4 min read",
      date: "25 Apr 2021",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "7 Ways To Distinguish The Quality Of The House We Want To Buy",
      author: {
        name: "Courtney Henry",
        avatar: "/placeholder.svg",
      },
      readTime: "6 min read",
      date: "24 Apr 2021",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "The Best Way To Know The Quality Of The House We Want To Buy",
      author: {
        name: "Darlene Robertson",
        avatar: "/placeholder.svg",
      },
      readTime: "2 min read",
      date: "24 Apr 2021",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  const featuredArticle = {
    title: "12 Things To Know Before Buying A House",
    author: {
      name: "Cameron Williamson",
      avatar: "/placeholder.svg",
    },
    readTime: "8 min read",
    date: "25 Apr 2021",
    description:
      "Want to buy a house but are unsure about what we should know, here I will try to explain what we should know and check when we want to buy a house",
    image: "/placeholder.svg?height=600&width=800",
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-bold text-primary flex items-center gap-2">
          <Home className="w-8 h-8 text-emerald-500" />
          Featured Residence
        </h2>
        <Button
          variant="default"
          className="bg-emerald-500 hover:bg-emerald-600 transition-colors duration-300"
        >
          More Articles
          <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardContent className="p-0">
                  <div className="flex gap-4 p-4">
                    <div className="w-24 h-24 relative rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage
                            src={article.author.avatar}
                            alt={article.author.name}
                          />
                          <AvatarFallback>
                            {article.author.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          {article.author.name}
                        </span>
                      </div>
                      <h3 className="font-semibold leading-tight">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                        <span>|</span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="relative h-[400px]">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">
                    {featuredArticle.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <Avatar>
                      <AvatarImage
                        src={featuredArticle.author.avatar}
                        alt={featuredArticle.author.name}
                      />
                      <AvatarFallback>
                        {featuredArticle.author.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span>{featuredArticle.author.name}</span>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-muted-foreground">
                  {featuredArticle.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{featuredArticle.readTime}</span>
                  <span>|</span>
                  <span>{featuredArticle.date}</span>
                </div>
                <Button variant="outline" className="w-full">
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
