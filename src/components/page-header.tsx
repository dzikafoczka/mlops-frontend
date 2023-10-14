interface PageHeaderProps {
    title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
    return (
        <h1 className="mb-1 text-2xl font-semibold text-mlops-primary-tx dark:text-mlops-primary-tx-dark">
            {title}
        </h1>
    );
};

export default PageHeader;
