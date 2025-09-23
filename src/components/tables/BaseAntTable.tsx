import { FilterOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React from 'react';
import '../../styles/BaseAntTable.scss';

export interface BaseAntTableProps<T> extends TableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  rowKey?: TableProps<T>['rowKey'];
  responsive?: boolean;
  compactOnMobile?: boolean;
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  hideColumnsOnMobile?: string[];
  mobileCardView?: boolean;
}

export function BaseAntTable<T extends object>({
  columns,
  data,
  rowKey = 'id',
  responsive = true,
  compactOnMobile = true,
  breakpoint = 'md',
  className,
  pagination,
  scroll,
  size = 'middle',
  ...rest
}: BaseAntTableProps<T>) {
  const [isMobile, setIsMobile] = React.useState(false);

  // Responsive breakpoints
  const breakpoints = React.useMemo(
    () => ({
      xs: 576,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1600,
      xxl: 1920,
    }),
    [],
  );

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < breakpoints.xs) {
        setIsMobile(true);
      } else if (width < breakpoints.sm) {
        setIsMobile(true);
      } else if (width < breakpoints.md) {
        setIsMobile(width < breakpoints[breakpoint]);
      } else if (width < breakpoints.lg) {
        setIsMobile(false);
      } else if (width < breakpoints.xl) {
        setIsMobile(false);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint, breakpoints]);

  const defaultPagination = React.useMemo(() => {
    const paginationSize: 'small' | 'default' = isMobile ? 'small' : 'default';
    return {
      showSizeChanger: !isMobile,
      showQuickJumper: !isMobile,
      showTotal: (total: number, range: [number, number]) =>
        isMobile ? `${range[0]}-${range[1]}/${total}` : `${range[0]}-${range[1]} của ${total} mục`,
      pageSizeOptions: ['10', '20', '50', '100'],
      size: paginationSize,
      pageSize: isMobile ? 10 : 20,
      ...pagination,
    };
  }, [isMobile, pagination]);

  const enhancedColumns = React.useMemo(() => {
    return columns.map((col) => ({
      ...col,
      showSorterTooltip: {
        title: 'Click để sắp xếp',
      },
      filterIcon:
        col.filterIcon ||
        ((filtered: boolean) => (
          <FilterOutlined
            style={{
              color: filtered ? 'var(--primary-color)' : '#94a3b8',
              fontSize: '14px',
              transition: 'all 0.3s ease',
            }}
          />
        )),
      ...col,
    }));
  }, [columns]);

  const responsiveScroll = React.useMemo(() => {
    if (!responsive) return scroll;

    return {
      x: 'max-content',
      ...scroll,
    };
  }, [responsive, scroll]);

  const responsiveColumns = React.useMemo(() => {
    if (!compactOnMobile) return enhancedColumns;

    return enhancedColumns.map((col, index) => {
      const responsive = col.responsive;
      let className = col.className || '';

      // Auto-hide columns on mobile based on priority
      if (isMobile) {
        // Always show first column (usually key/name)
        if (index === 0) {
          return { ...col, className: className.trim() };
        }

        // Always show last column if it contains actions
        if (
          index === enhancedColumns.length - 1 &&
          (col.key === 'actions' ||
            ('dataIndex' in col && col.dataIndex === 'actions') ||
            (col.title &&
              typeof col.title === 'string' &&
              col.title.toLowerCase().includes('thao tác')))
        ) {
          return { ...col, className: className.trim() };
        }

        // Hide non-essential columns on mobile
        if (
          !responsive ||
          (Array.isArray(responsive) && !responsive.includes('xs') && !responsive.includes('sm'))
        ) {
          className += ' hidden-xs hidden-sm';
        }
      }

      // Apply responsive classes based on breakpoints
      if (responsive && Array.isArray(responsive)) {
        if (!responsive.includes('xs')) className += ' hidden-xs';
        if (!responsive.includes('sm')) className += ' hidden-sm';
        if (!responsive.includes('md')) className += ' hidden-md';
        if (!responsive.includes('lg')) className += ' hidden-lg';
        if (!responsive.includes('xl')) className += ' hidden-xl';
      }

      return {
        ...col,
        className: className.trim(),
        // Reduce column width on mobile
        width:
          isMobile && col.width
            ? typeof col.width === 'number'
              ? Math.min(col.width, 120)
              : col.width
            : col.width,
      };
    });
  }, [enhancedColumns, compactOnMobile, isMobile]);

  const tableClassName = React.useMemo(() => {
    const baseClass = 'base-ant-table';
    const mobileClass = isMobile ? 'mobile-responsive' : '';
    return [baseClass, mobileClass, className].filter(Boolean).join(' ');
  }, [className, isMobile]);

  const tableSize = React.useMemo(() => {
    if (isMobile) return 'small';
    return size;
  }, [isMobile, size]);

  return (
    <div className={tableClassName}>
      <Table
        columns={responsiveColumns}
        dataSource={data}
        rowKey={rowKey}
        pagination={defaultPagination}
        scroll={responsiveScroll}
        size={tableSize}
        rowClassName={(_, index) => {
          const baseRowClass = `table-row-${index % 2 === 0 ? 'even' : 'odd'}`;
          const mobileRowClass = isMobile ? 'mobile-row' : '';
          return [baseRowClass, mobileRowClass].filter(Boolean).join(' ');
        }}
        {...rest}
      />
    </div>
  );
}
