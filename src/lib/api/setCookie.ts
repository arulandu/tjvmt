import { NextApiResponse } from 'next';
import { serialize, CookieSerializeOptions } from 'cookie';

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue = JSON.stringify(value)
  if(typeof options.maxAge === 'number'){
    options.expires = new Date(Date.now() + options.maxAge*1000)
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}