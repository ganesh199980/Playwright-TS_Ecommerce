/**
 * custom-logger.ts: This module implements a custom logger for Playwright testing. It adheres to the Reporter interface from Playwright
 * and utilizes the Winston logging library to deliver comprehensive logs for test runs. The logger features custom colors
 * for various log levels and can be configured to output logs to the console or a file.
 */

import { Reporter, TestCase, TestError, TestResult } from '@playwright/test/reporter';
import winston from 'winston';

/**
 * Custom color settings for the logger
 */
const customColors = {
  info: 'blue',
  error: 'red',
};
winston.addColors(customColors);

/**
 * Configuration for the logger
 */
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
  ],
});

/**
 * CustomLogger class that implements the Reporter interface from Playwright
 */
export default class CustomLogger implements Reporter {
  /**
   * Logs the initiation of a test case
   * @param {TestCase} test - The test case that is beginning
   */
  onTestBegin(test: TestCase): void {
    logger.info(`Starting Test Case: ${test.title}`);
  }

  /**
   * Logs the completion of a test case
   * @param {TestCase} test - The test case that has finished
   * @param {TestResult} result - The outcome of the test case
   */
  onTestEnd(test: TestCase, result: TestResult): void {
    if (result.status === 'passed') {
      logger.info(`\x1b[32mTest Case Passed: ${test.title}\x1b[0m`); // Green color
    } else if (result.status === 'skipped') {
      logger.info(`\x1b[33mTest Case Skipped: ${test.title}\x1b[0m`); // Yellow color
    } else if (result.status === 'failed' && result.error) {
      // Playwright's built-in reporter handles the error logging
    }
  }

  /**
   * Logs an error message
   * @param {TestError} error - The encountered error
   */
  onError(error: TestError): void {
    logger.error(error.message);
  }
}
