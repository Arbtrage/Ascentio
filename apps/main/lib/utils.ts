import axios from 'axios'

export const fetcher = (url: string) => axios.get(url).then((res: any) => res.data)
import { createGoogleGenerativeAI } from "@ai-sdk/google";


