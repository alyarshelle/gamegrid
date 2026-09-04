import Header from "../components/mainpage/Header"
import InfoLive from "../components/mainpage/InfoLive"
import AllInfo from "../components/mainpage/AllInfo"
import RankingsPage from "../pages/RankingsPage"
import LivePage from "../pages/LivePage"
import { Routes, Route } from "react-router-dom"

export default function MainPage() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/"
          element={
            <>
              <InfoLive />
              <AllInfo />
            </>
          }
        />
        <Route path="/live-games" element={<LivePage />} />
        <Route path="/rankings" element={<RankingsPage />} />
      </Routes>
    </>
  )
}