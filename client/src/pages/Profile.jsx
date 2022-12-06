import React, { useEffect, useState, useContext, useCallback } from "react";
import Select from "react-select";
import { Modal } from "../components/UI/Modal";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../contexts/AuthContext";
import { Loader } from "../components/Loader";
import { options, chooseAvatar } from "../tools/avatar";

import "../styles/Profile.css";
import defaultAvatar from "../assets/avatars/default.png";
let currentAvatar = "";

export const Profile = () => {
  const auth = useContext(AuthContext);

  const [modalActive, setModalActive] = useState(false);
  const [descriptionMessage, setDescriptionMessage] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [userLogin, setUserLogin] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [winsCount, setWinsCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);
  const [drawCounter, setDrawCounter] = useState(0);
  const [winRate, setWinRate] = useState(0);


  const { loading, request } = useHttp();

  const fetchData = useCallback(async () => {
    try {
      const data = await request("/api/user", "POST", { id: auth.userId });
      currentAvatar = data.avatar;
      setUserLogin(data.login);
      chooseAvatar(data.avatar, setAvatar, data.login);
      setDescription(data.description);
      setDescriptionMessage(data.description);
      setWinsCount(data.win_counter)
      setLoseCount(data.lose_counter)
      setDrawCounter(data.draw_counter)
      const winrateRes = (data.win_counter / (data.win_counter + data.lose_counter + data.draw_counter) ) * 100;
      setWinRate(winrateRes.toFixed(2));
    } catch (e) {}
  }, [request, auth.userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChangeDescriptionMessage = (event) => {
    setDescriptionMessage(event.target.value);
  };

  const handleDescription = async (event) => {
    event.preventDefault();
    setDescription(descriptionMessage);
    const tempAcatar = selectedOption ? selectedOption.value : currentAvatar;
    try {
      await request("/api/user/update", "POST", {
        id: auth.userId,
        description: descriptionMessage,
        avatar: tempAcatar,
      });
    } catch (e) {}
    setDescriptionMessage("");
    setModalActive(false);
    chooseAvatar(tempAcatar, setAvatar);
  };

  if (loading) {
    return <Loader info={"Loading..."} />;
  }
  return (
    <div className="row">
      <div className="col s8 offset-s2 Animation">
        {/*maybe add here s10/12 for profile description*/}
        <h3 className="TitleProfile"> User Profile</h3>
        <div className="row">
          <div className="col s5 ">
            {/*change here for width (here was s12 m5 -> changed into s5)*/}
            <div className="card cardProf deep-orange darken-3">
              <div className="card-image profileBlockImage">
                <img className="profileImage" src={avatar} alt="avatar" />
                <span className="card-title userNickname">{userLogin}</span>
              </div>
              <div className="card-content profileBlockContent row">
                <div className="col s1">
                  <i className="material-icons">info_outline</i>
                </div>
                <div className="col s9" style={{marginTop: '3px'}}>
                  <p> {description} </p>
                </div>
                <div className="col s2">
                  <button
                    // className="btn waves-effect waves-light changeDescription col s2 offset-s10"
                    className="btn waves-effect waves-light changeDescription"
                    name="action"
                    onClick={() => {
                      setModalActive(true);
                    }}
                  >
                    <i className="material-icons">create</i>
                  </button>
                </div>
                {/* HERE! */}
              </div>
            </div>
          </div>
          <div className="col s7 deep-orange darken-3 statCont">
            <div className="col s12 textStatistics statBlocksText">
              <span>Statistics</span>
            </div>
            <div className="col s6 textWins statBlocksText">
              <h4>Wins</h4>
              <h4>{winsCount}</h4>
            </div>
            <div className="col s6 textLose statBlocksText">
              <h4>Loses</h4>
              <h4>{loseCount}</h4>
            </div>
            <div className="col s6 textDraw statBlocksText">
              <h4>Draws</h4>
              <h4>{drawCounter}</h4>
            </div>
            <div className="col s6 textRate statBlocksText">
              <h4>WinRate</h4>
              <h4>{winRate}%</h4>
            </div>
          </div>
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <form className="row">
          <div className="col s8 offset-s2">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options()}
              placeholder="Select avatar..."
            />
          </div>
          <div className="col s12">
            <h6>Description:</h6>
            <input
              placeholder="Enter Description"
              id="description"
              type="text"
              onChange={handleChangeDescriptionMessage}
              value={descriptionMessage}
              autoComplete="off"
              maxLength="128"
            />
            <button
              className="btn waves-effect waves-light changeDescription"
              type="submit"
              name="action"
              onClick={handleDescription}
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
