import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getRecentProjects } from "../../Helpers/project.helper";
import { getStatusColor, stringAvatar } from "../../Helpers/helpers";
import Lottie from "lottie-react";
import noProjects from "../../Assets/LottieAssets/noProjects.json";

const RecentProjects = () => {
  const [projects, setProjects] = useState();
  useEffect(() => {
    const fetchRecentProjects = async () => {
      try {
        const response = await getRecentProjects();
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching recent tasks: ", error);
      }
    };

    fetchRecentProjects();
  }, []);
  return (
    <div className="bg-white p-3 rounded-lg flex flex-col items-center justify-start overflow-auto h-[200px] w-3/4">
      <h2 className="font-bold self-start">Recent Projects</h2>
      {projects?.length === 0 ? (
        <div>
          <Lottie
            animationData={noProjects}
            loop={true}
            className="w-[120px]"
          />
          <p className="text-sm text-gray-500">
            No recent projects, create or contribute into projects
          </p>
        </div>
      ) : (
        projects?.map((project) => (
          <div
            className="flex w-full justify-between items-center p-2 cursor-pointer mt-3 hover:opacity-70 bg-gray-200 transition-all rounded-md"
            key={project.id}
          >
            <div className="w-[300px] max-w-[300px] flex gap-3 items-center justify-start">
              <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                {project.title}
              </p>
              <p
                className={`${getStatusColor(
                  project.status
                )} p-1 px-2 rounded-xl text-sm w-20 flex items-center justify-center`}
              >
                {project.status}
              </p>
              <div>
                {project.project_manager.profile_picture ? (
                  <Avatar src={project.project_manager.profile_picture} />
                ) : (
                  <Avatar
                    {...stringAvatar(
                      `${project.project_manager.first_name} ${project.project_manager.last_name}`
                    )}
                  />
                )}
              </div>
            </div>

            <div className="flex items-start justify-start px-3">
              {project.team.map((teamMember, index) => (
                <Avatar
                  key={teamMember.id}
                  src={teamMember.profile_picture}
                  sx={{
                    width: 24,
                    height: 24,
                  }}
                  className="shadow-lg overflow-hidden overflow-ellipsis whitespace-nowrap -mx-1"
                  alt={`${teamMember.first_name} ${teamMember.last_name}`}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentProjects;
