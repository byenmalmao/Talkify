import{LoaderIcon} from "lucide-react"
import ThemeSelector from "./ThemeSelector"
import { useThemeStore } from "../store/useTheme.Store"

const PageLoader = () => {

  const {theme } = useThemeStore();
  return (
    <div className='min-h-screen flex items-center justify-center' data-theme={theme}>
        <LoaderIcon className='animate-spin size-10 text-primary'></LoaderIcon>
    </div>
  )
}

export default PageLoader