import React, { useEffect } from "react";
import { Grid } from "@mui/material";
// import "../styles/Profile.css";
import ProfileTabs from "../components/tabs/ProfileTabs";
import MessageSection from "../components/profile/MessageSection";
import SeriesSection from "../components/profile/SeriesSection";
import UserInformation from "../components/profile/UserInformation";
import UserService from "../services/user.service";
import { useParams } from "react-router-dom";
import MessageService from "../services/message.service";
import MyBreadcrumb from "../components/layout/Breadcrumb";
import ReviewSection from "../components/profile/ReviewSection";
import ReadingListSection from "../components/profile/ReadingList";



const Profile = () => {
  const { profile_username } = useParams();
  const [profileData, setProfileData] = React.useState(null);
  const [tabValue, setTabValue] = React.useState("one");


  const [messages, setMessages] = React.useState([]);
  useEffect(() => {

    MessageService.getMessages(profile_username).then(
      (response) => {console.log(response.data); setMessages(response.data);},
      (error) => {console.log(error);}
    );
  
    UserService.getUser(profile_username).then(
      (response) => {console.log(response.data); setProfileData(response.data);},
      (error) => {console.log(error);}
    );

  }, [profile_username]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    console.log(tabValue)
  };

  const renderTabContent = () => {
    switch (tabValue) {
      case "one":
        return <MessageSection messages={messages} profile_username={profile_username} />; 
      case "two":
        return <SeriesSection profile_username={profile_username} />; 
      case "three":
        return <ReviewSection />
      case "four":
        return <ReadingListSection />

      default:
        return null;
    }
  };


  return (
    <div style={{
      minHeight: "100vh",
    }}>
      {profileData && (
        <>
        <MyBreadcrumb items={[profile_username]} />
        <div className="container mt-4" style={{minWidth: "100vh"}}>
        <Grid container spacing={3}>
          {/* Left Column: User Profile */}
          <Grid item xs={12} md={3}>
            <UserInformation user={profileData} />
          </Grid>

          {/* Right Column: Profile Tabs */}
          <Grid item xs={12} md={8}>
            <ProfileTabs value={tabValue} handleChange={handleTabChange} renderTabContent={renderTabContent} />
            {/* {renderTabContent()} */}
            
            
{/*             
            <MessageSection messages={messages} profile_username={profile_username} />
            <SeriesSection /> */}
          </Grid>
        </Grid>
            

    </div>
    </>
      )}
      </div>
  );
};

export default Profile;
