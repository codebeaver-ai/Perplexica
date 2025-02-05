import { messages } from '../src/db/schema';
import { sqliteTable } from 'drizzle-orm/sqlite-core';

import { chats } from '../src/db/schema';

import { chats } from '../src/db/schema';
import { sql } from 'drizzle-orm';

import { chats } from '../src/db/schema';
import { text } from 'drizzle-orm/sqlite-core';

import { messages } from '../src/db/schema';

import { messages } from '../src/db/schema';
import { text } from 'drizzle-orm/sqlite-core';

import { messages, chats } from '../src/db/schema';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { messages } from '../src/db/schema';
import { text } from 'drizzle-orm/sqlite-core';

import { chats } from '../src/db/schema';
import { text } from 'drizzle-orm/sqlite-core';
















// Recreate the File interface for testing purposes
interface File {
  name: string;
  fileId: string;
}













/**
 * This test verifies that the 'messages' table in the schema has the correct structure,
 * including all expected columns with their proper types and constraints.
 */
test('messages table has correct structure', () => {
  expect(messages).toBeDefined();
  expect(messages.name).toBe('messages');

  const columns = messages.columns;

  expect(columns.id).toBeDefined();
  expect(columns.id.name).toBe('id');
  expect(columns.id.dataType).toBe('integer');
  expect(columns.id.primaryKey).toBe(true);

  expect(columns.content).toBeDefined();
  expect(columns.content.name).toBe('content');
  expect(columns.content.dataType).toBe('text');
  expect(columns.content.notNull).toBe(true);

  expect(columns.chatId).toBeDefined();
  expect(columns.chatId.name).toBe('chatId');
  expect(columns.chatId.dataType).toBe('text');
  expect(columns.chatId.notNull).toBe(true);

  expect(columns.messageId).toBeDefined();
  expect(columns.messageId.name).toBe('messageId');
  expect(columns.messageId.dataType).toBe('text');
  expect(columns.messageId.notNull).toBe(true);

  expect(columns.role).toBeDefined();
  expect(columns.role.name).toBe('type');
  expect(columns.role.dataType).toBe('text');
  expect(columns.role.enum).toEqual(['assistant', 'user']);

  expect(columns.metadata).toBeDefined();
  expect(columns.metadata.name).toBe('metadata');
  expect(columns.metadata.dataType).toBe('text');
  expect(columns.metadata.mode).toBe('json');
});


/**
 * This test verifies that the 'chats' table in the schema has the correct structure,
 * including all expected columns with their proper types and constraints.
 */
test('chats table has correct structure', () => {
  expect(chats).toBeDefined();
  expect(chats.name).toBe('chats');

  const columns = chats.columns;

  expect(columns.id).toBeDefined();
  expect(columns.id.name).toBe('id');
  expect(columns.id.dataType).toBe('text');
  expect(columns.id.primaryKey).toBe(true);

  expect(columns.title).toBeDefined();
  expect(columns.title.name).toBe('title');
  expect(columns.title.dataType).toBe('text');
  expect(columns.title.notNull).toBe(true);

  expect(columns.createdAt).toBeDefined();
  expect(columns.createdAt.name).toBe('createdAt');
  expect(columns.createdAt.dataType).toBe('text');
  expect(columns.createdAt.notNull).toBe(true);

  expect(columns.focusMode).toBeDefined();
  expect(columns.focusMode.name).toBe('focusMode');
  expect(columns.focusMode.dataType).toBe('text');
  expect(columns.focusMode.notNull).toBe(true);

  expect(columns.files).toBeDefined();
  expect(columns.files.name).toBe('files');
  expect(columns.files.dataType).toBe('text');
  expect(columns.files.mode).toBe('json');
  expect(columns.files.default).toBeDefined(); // Check if default value is set
});


/**
 * This test verifies that the 'files' column in the 'chats' table
 * has the correct default value, which should be an empty JSON array.
 */
test('chats table files column has correct default value', () => {
  const filesColumn = chats.columns.files;
  
  expect(filesColumn).toBeDefined();
  expect(filesColumn.default).toBeDefined();
  
  // The default value should be the SQL expression '[]'
  expect(filesColumn.default).toEqual(sql`'[]'`);
  
  // Ensure the default value is a valid JSON array
  const defaultValue = filesColumn.default.toString();
  expect(() => JSON.parse(defaultValue)).not.toThrow();
  expect(JSON.parse(defaultValue)).toEqual([]);
});


/**
 * This test verifies that the 'files' column in the 'chats' table
 * is correctly set up to handle an array of File objects.
 */
test('chats table files column has correct type for File array', () => {
  const filesColumn = chats.columns.files;
  
  expect(filesColumn).toBeDefined();
  expect(filesColumn.dataType).toBe('text');
  expect(filesColumn.mode).toBe('json');
  
  // Check if the column type is correctly set for File[]
  expect(filesColumn.$type()).toEqual(expect.arrayContaining([
    expect.objectContaining({
      name: expect.any(String),
      fileId: expect.any(String)
    })
  ]));

  // Verify that the column type matches the text type with json mode
  expect(filesColumn).toEqual(
    expect.objectContaining({
      ...text('files', { mode: 'json' })
    })
  );
});


/**
 * This test verifies that the 'role' column in the 'messages' table
 * has the correct name and enum values.
 */
test('messages table role column has correct enum values', () => {
  const roleColumn = messages.columns.role;

  expect(roleColumn).toBeDefined();
  expect(roleColumn.name).toBe('type');
  expect(roleColumn.dataType).toBe('text');
  
  // Check if the enum values are correctly set
  expect(roleColumn.enum).toBeDefined();
  expect(roleColumn.enum).toEqual(['assistant', 'user']);

  // Verify that only 'assistant' and 'user' are allowed as enum values
  expect(roleColumn.enum).toContain('assistant');
  expect(roleColumn.enum).toContain('user');
  expect(roleColumn.enum?.length).toBe(2);
});


/**
 * This test verifies that the 'metadata' column in the 'messages' table
 * is correctly set up to handle JSON data.
 */
test('messages table metadata column handles JSON data correctly', () => {
  const metadataColumn = messages.columns.metadata;
  
  expect(metadataColumn).toBeDefined();
  expect(metadataColumn.name).toBe('metadata');
  expect(metadataColumn.dataType).toBe('text');
  expect(metadataColumn.mode).toBe('json');

  // Verify that the column type matches the text type with json mode
  expect(metadataColumn).toEqual(
    expect.objectContaining({
      ...text('metadata', { mode: 'json' })
    })
  );

  // Test JSON compatibility
  const sampleJSON = { key: 'value', number: 42, nested: { array: [1, 2, 3] } };
  const stringifiedJSON = JSON.stringify(sampleJSON);

  // Simulate storing and retrieving JSON data
  const storedValue = metadataColumn.mapFromDriverValue(stringifiedJSON);
  expect(storedValue).toEqual(sampleJSON);

  const driverValue = metadataColumn.mapToDriverValue(sampleJSON);
  expect(driverValue).toBe(stringifiedJSON);
});


/**
 * This test verifies that the 'chatId' column in the 'messages' table
 * is correctly defined and could potentially be used as a foreign key
 * referencing the 'id' column in the 'chats' table.
 */
test('messages table chatId column is compatible with chats table id column', () => {
  const messagesTable = messages;
  const chatsTable = chats;

  const chatIdColumn = messagesTable.columns.chatId;
  const chatsIdColumn = chatsTable.columns.id;

  expect(chatIdColumn).toBeDefined();
  expect(chatsIdColumn).toBeDefined();

  // Check that both columns are of the same type
  expect(chatIdColumn.dataType).toBe(chatsIdColumn.dataType);
  expect(chatIdColumn.dataType).toBe('text');

  // Verify that chatId in messages table is not null
  expect(chatIdColumn.notNull).toBe(true);

  // Check that the chatId column definition matches what we'd expect for a foreign key
  expect(chatIdColumn).toEqual(
    expect.objectContaining({
      ...text('chatId').notNull()
    })
  );

  // Verify that the id column in chats table is the primary key
  expect(chatsIdColumn.primaryKey).toBe(true);

  // While we can't directly test for a foreign key constraint in this schema,
  // we can assert that the columns are compatible for such a relationship
  expect(chatIdColumn.name).toBe('chatId');
  expect(chatsIdColumn.name).toBe('id');
});


/**
 * This test verifies that the 'messageId' column in the 'messages' table
 * is correctly defined as a non-null text field, which is necessary for
 * ensuring uniqueness at the database level.
 */
test('messages table messageId column is defined for uniqueness', () => {
  const messageIdColumn = messages.columns.messageId;

  expect(messageIdColumn).toBeDefined();
  expect(messageIdColumn.name).toBe('messageId');
  expect(messageIdColumn.dataType).toBe('text');
  expect(messageIdColumn.notNull).toBe(true);

  // Verify that the column definition matches what we'd expect for a unique identifier
  expect(messageIdColumn).toEqual(
    expect.objectContaining({
      ...text('messageId').notNull()
    })
  );

  // While we can't directly test for a unique constraint in this schema,
  // we can assert that the column is set up in a way that would allow for uniqueness
  expect(messageIdColumn.notNull).toBe(true);
  
  // Check that the column is not the primary key (as 'id' is the primary key)
  expect(messageIdColumn.primaryKey).toBeFalsy();
});


/**
 * This test verifies that the 'createdAt' column in the 'chats' table
 * is correctly defined as a non-null text field and can handle date-time strings.
 */
test('chats table createdAt column is properly defined and handles date-time strings', () => {
  const createdAtColumn = chats.columns.createdAt;

  expect(createdAtColumn).toBeDefined();
  expect(createdAtColumn.name).toBe('createdAt');
  expect(createdAtColumn.dataType).toBe('text');
  expect(createdAtColumn.notNull).toBe(true);

  // Verify that the column definition matches what we'd expect for a date-time field
  expect(createdAtColumn).toEqual(
    expect.objectContaining({
      ...text('createdAt').notNull()
    })
  );

  // Test handling of ISO date string
  const isoDateString = '2023-05-15T14:30:00.000Z';
  const storedValue = createdAtColumn.mapFromDriverValue(isoDateString);
  expect(storedValue).toBe(isoDateString);

  const driverValue = createdAtColumn.mapToDriverValue(isoDateString);
  expect(driverValue).toBe(isoDateString);

  // Test that it doesn't modify the date string
  expect(new Date(storedValue).toISOString()).toBe(isoDateString);
});
