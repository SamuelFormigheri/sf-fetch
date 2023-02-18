# sf-fetch

This is a simple library to implement cache on fetch using the cache api from browser.

## Install

### npm
npm i sf-fetch

### yarn
yarn add sf-fetch

## Usage

It exposes 3 functions:

### fetchWithCache
Executes a fetch caching the response for a specific amount of time

### clearCache
Clear cache url

### resetCache
Reset all caches url

### clearCacheKeysThatIncludes
Clear all cache keys that includes the value passed as parameter