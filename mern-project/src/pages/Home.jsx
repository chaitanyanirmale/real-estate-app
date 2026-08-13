import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { ArrowRight, Search, MapPin, Users, ShieldCheck, Building2 } from "lucide-react";
import ListingItem from '../components/ListingItem';
import Hero from '../components/Home/Hero';
import Stats from '../components/Home/Stats';
import WhyCoooseUs from '../components/Home/WhyCoooseUs';
import FeaturedProjects from '../components/Home/FeaturedProjects';
import CTA from '../components/Home/CTA';

export default function Home() {
  
  return (
    <div>
      <Hero />
      <FeaturedProjects />
      <WhyCoooseUs />
      <Stats />
      <CTA />
    </div>
  )
}
