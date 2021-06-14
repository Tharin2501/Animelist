type SynopsisType = {
  toggleSynopsis: boolean;
  // src: https://stackoverflow.com/questions/54575523/issue-with-passing-hook-to-child-typescript
  setToggleSynopsis: (toggleSynopsis: boolean) => void;
  actualAnime: string[];
};

export default SynopsisType;