import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCalendar, faChevronCircleLeft, faChevronLeft, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "../../../../components/ExternalLink";
import { Spinner } from "../../../../components/Spinner";
import { relativeDateFormatter } from "../../../../utils/formatter";
import { IPost } from "../../../Blog";
import { PostHeaderContainer } from "./styles";

interface PostHeaderProps {
  isLoading: boolean
  postData: IPost
}

export function PostHeader({ isLoading, postData }: PostHeaderProps) {
  const navigate = useNavigate()

  function goBack() {
    navigate(-1)
  }

  const formattedDate = relativeDateFormatter(postData?.created_at)

  return (
    <PostHeaderContainer>
      { isLoading ? (<Spinner />) : (
        <>
          <header>
            <ExternalLink as="button" onClick={goBack} icon={<FontAwesomeIcon icon={faChevronLeft} />} text="Back" variant="iconLeft" /> 
            <ExternalLink text="Open on Github" href={postData.html_url} target="_blank" /> 
          </header>

          <h1>{postData.title}</h1>
          <ul>
            <li>
              <FontAwesomeIcon icon={faGithub} />
              {postData.user.login}
            </li>
            <li>
              <FontAwesomeIcon icon={faCalendar} />
              {formattedDate}
            </li>
            <li>
              <FontAwesomeIcon icon={faComment} />
              {postData.comments} comments
            </li>
          </ul>
        </>
      ) }
    </PostHeaderContainer>
  )
}