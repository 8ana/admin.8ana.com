import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import moment from 'moment';
import { getLang } from '@/locales';
import { useColumnsSetting } from '@/hooks';
import { DeleteBtn, columnsSorter, columnsFilter, columnsFilterRequest, QuickEdit } from '@/components';
import { timeFormatAll } from '@/constants';
import { statusSource, updateSource, updateDaySource } from '@/constants/select';
import { EditForm } from './form';

import { EposideType, CommonType, ComponentsType } from '@/types';

export const useColumns = (state: CommonType.ListQuery, methods: CommonType.ListMethods<EposideType.UpdateItemReq>) => {
  const columnsOrigin: ComponentsType.ColumnsType<EposideType.EposideItem> = useMemo(
    () => [
      {
        title: getLang('animate.title'),
        ...columnsSorter(state, 'title', true),
        width: 300,
        align: 'left',
        render: (text, record) => <Link to={`/home/animate/edit/${record.id}`}>{text}</Link>,
      },
      {
        title: getLang('animate.slug'),
        ...columnsSorter(state, 'slug', true),
        width: 140,
      },
      {
        title: getLang('animate.author'),
        ...columnsSorter(state, 'author', true),
        dataIndex: ['author', 'name'],
      },
      {
        title: getLang('animate.update'),
        ...columnsFilter(state, updateSource, 'isUpdate', true),
      },
      {
        title: getLang('animate.updateDay'),
        ...columnsFilter(state, updateDaySource, 'updateDay', true),
      },
      {
        title: getLang('animate.eposide'),
        ...columnsSorter(state, 'countEposide', true),
      },
      {
        title: getLang('animate.comment'),
        ...columnsSorter(state, 'countComment', true),
      },
      {
        title: getLang('animate.danmu'),
        ...columnsSorter(state, 'countDanmu'),
      },
      {
        title: getLang('animate.play'),
        ...columnsSorter(state, 'countPlay'),
      },
      {
        title: getLang('rate.rateStar'),
        ...columnsSorter(state, 'countStar'),
      },
      {
        title: getLang('rate.rateCount'),
        ...columnsSorter(state, 'countRate'),
      },
      {
        title: getLang('animate.like'),
        ...columnsSorter(state, 'countLike'),
      },
      {
        title: getLang('animate.level'),
        ...columnsSorter(state, 'level'),
      },
      {
        title: getLang('animate.category.area'),
        ...columnsFilterRequest(state, 'area', false, 'aarea'),
      },
      {
        title: getLang('animate.category.year'),
        ...columnsFilterRequest(state, 'year', false, 'ayear'),
      },
      {
        title: getLang('animate.category.kind'),
        ...columnsFilterRequest(state, 'kind', false, 'akind'),
      },
      {
        title: getLang('animate.category.tag'),
        ...columnsFilterRequest(state, 'tag', false, 'atag'),
      },
      {
        title: getLang('animate.status'),
        ...columnsFilter(state, statusSource, 'status', true),
      },
      {
        title: getLang('animate.updatedTime'),
        ...columnsSorter(state, 'updatedAt', true),
        render: val => moment(val).format(timeFormatAll),
      },
      {
        title: getLang('animate.option'),
        key: 'option',
        preset: true,
        dataIndex: 'id',
        align: 'center',
        fixed: 'right',
        width: 160,
        render: (text, record) => (
          <Space>
            <QuickEdit<EposideType.EposideItem, EposideType.UpdateItemReq> data={record} submit={methods.update} init={methods.init}>
              <EditForm />
            </QuickEdit>
            <DeleteBtn title={record.title} initCall={methods.init} deleteCall={() => methods.remove(text)} />
          </Space>
        ),
      },
    ],
    [state, methods]
  );

  const { columns, SettingBtn } = useColumnsSetting<EposideType.EposideItem>(columnsOrigin, 'animateColumns');
  return { columns, SettingBtn };
};
