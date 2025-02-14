import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  getCurrentCourseProgressService,
  markCurrentLectureAsViewedService,
  resetCurrentCourseProgressService,
} from "@/services";
import {
  Book,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  RotateCcw,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";
import bb from "../../../assets/bb.svg";

function StudentViewCourseProgressPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } =
    useContext(StudentContext);
  const [lockCourse, setLockCourse] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] =
    useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const { id } = useParams();

  async function fetchCurrentCourseProgress() {
    const response = await getCurrentCourseProgressService(auth?.user?._id, id);
    if (response?.success) {
      if (!response?.data?.isPurchased) {
        setLockCourse(true);
      } else {
        setStudentCurrentCourseProgress({
          courseDetails: response?.data?.courseDetails,
          progress: response?.data?.progress,
        });

        if (response?.data?.completed) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
          setShowCourseCompleteDialog(true);
          setShowConfetti(true);

          return;
        }

        if (response?.data?.progress?.length === 0) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
        } else {
          console.log("logging here");
          const lastIndexOfViewedAsTrue = response?.data?.progress.reduceRight(
            (acc, obj, index) => {
              return acc === -1 && obj.viewed ? index : acc;
            },
            -1
          );

          setCurrentLecture(
            response?.data?.courseDetails?.curriculum[
              lastIndexOfViewedAsTrue + 1
            ]
          );
        }
      }
    }
  }

  async function updateCourseProgress() {
    if (currentLecture) {
      const response = await markCurrentLectureAsViewedService(
        auth?.user?._id,
        studentCurrentCourseProgress?.courseDetails?._id,
        currentLecture._id
      );

      if (response?.success) {
        fetchCurrentCourseProgress();
      }
    }
  }

  async function handleRewatchCourse() {
    const response = await resetCurrentCourseProgressService(
      auth?.user?._id,
      studentCurrentCourseProgress?.courseDetails?._id
    );

    if (response?.success) {
      setCurrentLecture(null);
      setShowConfetti(false);
      setShowCourseCompleteDialog(false);
      fetchCurrentCourseProgress();
    }
  }

  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [id]);

  useEffect(() => {
    if (currentLecture?.progressValue === 1) updateCourseProgress();
  }, [currentLecture]);

  useEffect(() => {
    if (showConfetti) setTimeout(() => setShowConfetti(false), 15000);
  }, [showConfetti]);

  console.log(currentLecture, "currentLecture");
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {showConfetti && (
        <ReactConfetti
          numberOfPieces={800}
          recycle={true}
          run={true}
          width={3000}
          height={3000}
        />
      )}
      <div className="flex items-center justify-between p-4 bg-black/90 border-b border-gray-700">
        <div className="flex items-center justify-between space-x-4">
          <img src={bb} alt="" className="  w-4" />
          <Button
            onClick={() => navigate("/student-courses")}
            size="sm"
            className="hover:scale-105 transition-all bg-orange-500 hover:bg-orange-500"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            My Courses
          </Button>

          <h1 className="text-md md:text-lg">
            {studentCurrentCourseProgress?.courseDetails?.title}
          </h1>
        </div>
        <Button
          className="bg-orange-500 hover:bg-orange-500 hover:scale-105 transition-all"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        >
          {isSideBarOpen ? (
            <span className="flex flex-row items-center font-semibold">
              <ChevronRight className="h-5 w-5 text-white" /> Hide
            </span>
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`flex-1 ${
            isSideBarOpen ? "mr-[400px]" : ""
          } transition-all duration-300`}
        >
          <VideoPlayer
            width="100%"
            height="500px"
            url={currentLecture?.videoUrl}
            onProgressUpdate={setCurrentLecture}
            progressData={currentLecture}
          />
          <div className="p-6 bg-blend-color/90 ">
            <h2 className="text-lg md:text-2xl font-bold mb-2">
              {currentLecture?.title}
            </h2>
          </div>
        </div>

        {/* Side bar component */}

        <div
          className={`fixed top-[58px] right-0  bottom-0border-gray-600 w-[200px] md:w-[400px] bg-black transition-all duration-300 ${
            isSideBarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Tabs
            defaultValue="content"
            className="h-full rounded-none flex flex-col mt-2 mr-2 ml-2"
          >
            <TabsList className="grid bg-[#1c1d1f] rounded-none  w-full grid-cols-2 p-0 h-14 ">
              <TabsTrigger
                value="content"
                className=" text-white rounded-none h-full"
              >
                Course Content
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className=" text-white rounded-none h-full"
              >
                Overview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {studentCurrentCourseProgress?.courseDetails?.curriculum.map(
                    (item) => (
                      <div
                        key={item?._id}
                        className="flex items-center space-x-2 text-sm text-white font-bold cursor-pointer"
                      >
                        {studentCurrentCourseProgress?.progress?.find(
                          (ProgressItem) =>
                            ProgressItem?.lectureId === item?._id
                        )?.viewed ? (
                          <CheckCircle className="h-5 w-5  text-green-500" />
                        ) : (
                          <PlayCircle className="h-5 w-5 text-orange-500" />
                        )}
                        <span>{item?.title}</span>
                      </div>
                    )
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 ">
                  <h2 className="text-xl font-black mb-4">About the Course</h2>
                  <p className="text-gray-400 text-sm">
                    {studentCurrentCourseProgress?.courseDetails?.description}
                  </p>
                </div>
                <div className="p-4 ">
                  <h2 className="text-xl font-black mb-4">
                    Message to Students
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {
                      studentCurrentCourseProgress?.courseDetails
                        ?.welcomeMessage
                    }
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={lockCourse}>
        <DialogContent showOverlay={false} className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>You can't access this course</DialogTitle>
            <DialogDescription>
              You need to purchase this course to access it.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={showCourseCompleteDialog}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              Congratulations! 🎉
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-3">
              <Label className="text-center mt-2">
                You have completed the course 🥳
              </Label>
              <div className="flex flex-row gap-3 mt-5 justify-around">
                <Button
                  onClick={() => navigate("/student-courses")}
                  variant="ghost"
                  className="shadow-orange-200 shadow-sm"
                >
                  <Book />
                  My Courses
                </Button>
                <Button
                  onClick={handleRewatchCourse}
                  variant="ghost"
                  className="shadow-orange-200 shadow-sm"
                >
                  <RotateCcw />
                  Rewatch Course
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentViewCourseProgressPage;
