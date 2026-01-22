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
  const [slidesToShow, setSlidesToShow] = useState(1);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
  };

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;

      if (w >= 1024) return 4;
      if (w >= 768) return 3;

      if (w >= 640) return 2;

      return 1;
    };

    const update = () => setSlidesToShow(calc());

    update();

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const fetchInitial = async () => {
      const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"), limit(6));
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
    <section className="min-h-[calc(100vh-64px-56px)] flex items-center justify-center  ">
      {/* schräger Hintergrund */}

      <div className="mx-auto max-w-3xl px-6 text-center leading-relaxed break-words [overflow-wrap:anywhere]">
        <h1 className="font-bold text-4xl mb-6">
          {siteConfig.name} <small className="text-sm font-light">FullStack Project</small>
        </h1>
        <p className="text-default-500 mb-6 text-xs mx-auto w-3/4 sm:w-full  ">{siteConfig.description}</p>

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
          <div className="grid w-full max-w-lg grid-cols-4 place-items-center gap-3 px-6 text-black dark:text-default-200 sm:grid-cols-5 sm:px-6 lg:grid-cols-4 lg:w-6/12">
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

        <div className="hidden sm:block">
          {jobs.length >= 6 && (
            <div className="mt-12 -mx-6 sm:mx-0">
              <div className="w-full overflow-hidden sm:relative sm:left-1/2 sm:right-1/2 sm:-mx-[50vw] sm:w-[100dvw]">
                <Slider {...settings}>
                  {jobs.map((job) => (
                    <div key={job.id}>
                      <div className="px-3 min-w-0">
                        <JobCard showcaseItem job={job} />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
