import React, { createContext, FC } from 'react';
import useSWR from 'swr';
import { RootStackProps } from '../../interfaces/routing';
import { BitriseApp, BitriseBuild, BitriseLog } from '../../interfaces/bitrise';

export const LogContext = createContext<
  [string, BitriseBuild, BitriseApp, boolean]
>(['', {} as BitriseBuild, {} as BitriseApp, true]);

const Logs: FC<Pick<RootStackProps, 'Build'>> = ({
  Build: { app, build },
  children,
}) => {
  const { data: buildInfo, isValidating } = useSWR(
    `/apps/${app.slug}/builds/${build.slug}`,
    {
      refreshInterval: build.status === 0 ? 5000 : 0,
    },
  );

  const { data: rawLogs } = useSWR<BitriseLog>(
    `/apps/${app.slug}/builds/${build.slug}/log`,
    {
      refreshInterval: build.status === 0 ? 5000 : 0,
    },
  );

  const logs =
    rawLogs?.log_chunks
      ?.sort((a, b) => (a.position > b.position ? 1 : -1))
      .map((element) => {
        try {
          return decodeURIComponent(
            element.chunk.replace(/(\[3\d;1m)|(\[0m)/g, ''),
          );
        } catch (e) {
          return '';
        }
      })
      .join('\n') || '';

  return (
    <LogContext.Provider
      value={[logs, buildInfo?.data || build, app, isValidating]}>
      {children}
    </LogContext.Provider>
  );
};

export default Logs;
