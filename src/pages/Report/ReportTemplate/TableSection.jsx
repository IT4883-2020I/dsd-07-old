import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Table, Input, Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';

export default function TableSection({
  section,
  onSectionChange,
  formatted,
}) {
  const [data, setData] = useState([]);
  const onDeleteRow = useCallback((key) => {
    setData((data) => data.filter((record) => record.key !== key));
  }, []);
  const onCellChange = useCallback((e, key) => {
    const { target: { name, value } } = e;
    setData((data) => data.map((record) => {
      if (record.key !== key) return record;
      return {
        ...record,
        [name]: value,
      }
    }));
  }, []);
  const columns = useMemo(() => {
    if (!(section.headers && section.headers.length > 0)) return [];

    return [
      ...section.headers.map((header) => ({
        title: header,
        dataIndex: header,
        render: (text, record) => (
          formatted ? (
            section.keys[header]
          ) : (
            <Input
              name={header}
              onChange={(e) => onCellChange(e, record.key)}
            />
          )
        ),
      })),
      ...(formatted ? [] : [
        {
          dataIndex: '_default_delete',
          render: (text, record) => (
            <a onClick={() => onDeleteRow(record.key)}>Xóa</a>
          ),
        },
      ])
    ];
  }, [section.headers, onDeleteRow, onCellChange, formatted]);

  const onClickAddRow = useCallback(() => {
    setData((data) => ([
      ...data,
      section.headers.reduce((finalResult, currentItem) => ({
        ...finalResult,
        [currentItem]: null,
      }), {
        key: uuidv4(),
      }),
    ]))
  }, [columns]);

  useEffect(() => {
    onSectionChange && onSectionChange({
      uniqueId: section.uniqueId,
      records: data,
    });
  }, [data, section.uniqueId]);

  if (columns.length === 0) return null;

  return (
    <>
      {!formatted && (
        <Button
          onClick={onClickAddRow}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Thêm dòng +
        </Button>
      )}
      <Table
        size="small"
        columns={columns}
        dataSource={data}
        bordered
        style={{ marginBottom: 16 }}
      />
    </>
  );
}
