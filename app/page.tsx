/* eslint-disable prettier/prettier */
"use client";
import React from "react";
import Slider from "react-slick";
import { Link, Tooltip } from "@heroui/react";
import { useEffect, useState } from "react";
import { query, collection, orderBy, limit, getDocs } from "firebase/firestore";

import { useUI } from "./context/scraper-modal";

import { siteConfig } from "@/config/site";
import { db } from "@/lib/firebase";
import { Job } from "@/types";
import JobCard from "@/components/job-card";
export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { onOpen } = useUI();

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    arrows: false,
  };

  useEffect(() => {
    const fetchInitial = async () => {
      const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"), limit(22));
      const snapshot = await getDocs(q);

      const jobsData = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as Job,
      );

      setJobs(jobsData);
    };

    fetchInitial();
  }, []);

  useEffect(() => {
    console.log(jobs);
  }, [jobs]);

  return (
    <section className="min-h-[calc(100vh-64px-56px)] flex items-center justify-center overflow-x-hidden ">
      {/* schräger Hintergrund */}

      <div className="mx-auto max-w-3xl px-6 text-center leading-relaxed">
        <h1 className="font-bold text-4xl mb-6">
          {siteConfig.name} <small className="text-sm font-light">FullStack Project</small>
        </h1>
        <p className="text-default-500 mb-6 text-xs">{siteConfig.description}</p>

        <div className="mb-12 flex items-center justify-center gap-3 text-xs font-extralight text-default-500">
          <span>[</span>

          <div className="flex gap-2">
            {siteConfig.fullNavItems.map((item) => (
              <Link key={item.href} className="text-primary after:content-['|'] after:ml-2 last:after:content-none text-xs" href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link className="text-primary after:content-['|'] after:ml-2 last:after:content-none text-xs cursor-pointer" onPress={onOpen}>
              Crawler
            </Link>
          </div>

          <span>]</span>
        </div>

        <div className="flex justify-center w-full">
          <div className="w-full grid grid-cols-4 place-items-center gap-3 px-12 sm:px-6 text-black dark:text-default-200 sm:grid-cols-5 lg:grid-cols-4 lg:w-6/12">
            {siteConfig.frontIconNav.map((item) => (
              <Tooltip key={item.label} content={item.label}>
                <Link isExternal aria-label={item.label} className="text-inherit" href={item.href}>
                  <div className="scale-80 sm:scale-100" title={item.label}>
                    <item.icon size={36} />
                  </div>
                </Link>
              </Tooltip>
            ))}
          </div>
        </div>

        <div className="slider-container relative left-[-100%] w-[2000px] mt-12  ">
          <Slider {...settings}>
            {jobs.map((job) => (
              <div key={job.id} className="w-lg">
                <div className="px-3">
                  <JobCard job={job} showcaseItem={true} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
