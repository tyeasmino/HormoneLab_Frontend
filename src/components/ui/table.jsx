// src/components/ui/table.jsx
import React from 'react';

const Table = ({ children }) => {
  return <table className="min-w-full">{children}</table>;
};

const TableHeader = ({ children }) => {
  return <thead className="bg-gray-100">{children}</thead>;
};

const TableRow = ({ children }) => {
  return <tr className="border-b">{children}</tr>;
};

const TableHead = ({ children }) => {
  return <th className="px-6 py-3 text-left">{children}</th>;
};

const TableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const TableCell = ({ children }) => {
  return <td className="px-6 py-4">{children}</td>;
};

export { Table, TableHeader, TableRow, TableHead, TableBody, TableCell };
