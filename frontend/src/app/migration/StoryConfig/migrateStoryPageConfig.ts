/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { StoryPageConfig } from 'app/pages/StoryBoardPage/slice/types';
import { getInitStoryPageConfig } from 'app/pages/StoryBoardPage/utils';
import { VERSION_BETA_0, VERSION_BETA_1, VERSION_LIST } from '../constants';

export const parseStoryPageConfig = (storyConfig: string) => {
  try {
    let nextConfig: StoryPageConfig = JSON.parse(storyConfig);
    return nextConfig;
  } catch (error) {
    let nextConfig = getInitStoryPageConfig();
    return nextConfig;
  }
};

export const beta0 = (config: StoryPageConfig) => {
  config.version = config.version || VERSION_BETA_0;
  const canHandleVersions = VERSION_LIST.slice(0, 1);
  if (!canHandleVersions.includes(config.version)) return config;
  return config;
};
export const beta1 = (config: StoryPageConfig) => {
  const canHandleVersions = VERSION_LIST.slice(0, 2);
  if (!canHandleVersions.includes(config.version)) return config;
  config.version = VERSION_BETA_1;
  return config;
};
export const migrateStoryPageConfig = (configStr: string) => {
  let config = parseStoryPageConfig(configStr);
  return beta1(beta0(config));
};