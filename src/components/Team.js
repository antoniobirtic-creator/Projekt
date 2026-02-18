import React from "react";
import "./Team.css";

const Team = () => {
  const members = [
    { id: 1, name: "Killan James", role: "Admin", email: "killan@example.com" },
    { id: 2, name: "Zeynep Akca", role: "Editor", email: "zeynep@example.com" },
  ];

  return (
    <div className="team-tab">
      <div className="team-list">
        {members.map((member) => (
          <div key={member.id} className="team-member">
            <div className="member-info">
              <strong>{member.name}</strong>
              <span>{member.email}</span>
            </div>
            <span className="member-role">{member.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
