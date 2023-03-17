# sf-fetch

This is a simple library to implement cache on fetch using the cache api from browser.

## Install

### npm
npm i sf-fetch

### yarn
yarn add sf-fetch

## Usage

It exposes 5 functions:

### fetchWithCache
Executes a fetch caching the response for a specific amount of time

### clearCache
Clear cache url

### clearAllCache
Clear all cache

### clearCacheKeysThatIncludes
Clear all cache keys that includes the value passed as parameter

### getResponseDate
Get the date that the response was executed by the header 'date'