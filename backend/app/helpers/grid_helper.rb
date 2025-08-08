module GridHelper
    def self.filters(records, params, options = {})

        if params[:startRow].present? && params[:endRow].present?
            records.offset!(params[:startRow]).limit!(params[:endRow].to_i - params[:startRow].to_i)
        end

        if params[:sortModel].present? && params[:sortModel].length > 0
			params[:sortModel].each do |data|
				records.order!("#{data[:colId]} #{data[:sort]}")
			end

		end

		if params[:filterModel].present? && params[:filterModel].keys.length > 0
			params[:filterModel].keys.each do |fieldName|
				next if options[:exclude].present? && options[:exclude].include?(fieldName)

				filter = params[:filterModel][fieldName]
				records.where!("#{fieldName} LIKE ?", "%#{filter[:filter]}%") if filter[:type] == "contains"
				records.where!("#{fieldName} NOT LIKE ?", "%#{filter[:filter]}%") if filter[:type] == "notContains"
				records.where!("#{fieldName} LIKE ?", "#{filter[:filter]}%") if filter[:type] == "startsWith"
				records.where!("#{fieldName} LIKE ?", "%#{filter[:filter]}") if filter[:type] == "endsWith"
				records.where!("#{fieldName} = ?", filter[:filter]) if filter[:type] == "equals" && ["text", "number"].include?(filter[:filterType])
				records.where!("#{fieldName} != ?", filter[:filter]) if filter[:type] == "notEqual" && ["text", "number"].include?(filter[:filterType])

				if filter[:filterType] == "number"
					records.where!("#{fieldName} BETWEEN ? AND ?", filter[:filter], filter[:filterTo]) if filter[:type] == "inRange"
					records.where!("#{fieldName} < ?", filter[:filter]) if filter[:type] == "lessThan"
					records.where!("#{fieldName} <= ?", filter[:filter]) if filter[:type] == "lessThanOrEqual"
					records.where!("#{fieldName} > ?", filter[:filter]) if filter[:type] == "greaterThan"
					records.where!("#{fieldName} >= ?", filter[:filter]) if filter[:type] == "greaterThanOrEqual"
				end
				if filter[:filterType] == "date"
					records.where!("DATE(#{fieldName}) BETWEEN DATE(?) AND DATE(?)", filter[:dateFrom], filter[:dateTo]) if filter[:type] == "inRange"
					records.where!("DATE(#{fieldName}) < DATE(?)", filter[:dateFrom]) if filter[:type] == "lessThan"
					records.where!("DATE(#{fieldName}) <= DATE(?)", filter[:dateFrom]) if filter[:type] == "lessThanOrEqual"
					records.where!("DATE(#{fieldName}) > DATE(?)", filter[:dateFrom]) if filter[:type] == "greaterThan"
					records.where!("DATE(#{fieldName}) >= DATE(?)", filter[:dateFrom]) if filter[:type] == "greaterThanOrEqual"
					records.where!("DATE(#{fieldName}) = DATE(?)", Date.parse(filter[:dateFrom])) if filter[:type] == "equals"
					records.where!("DATE(#{fieldName}) != DATE(?)", filter[:dateFrom]) if filter[:type] == "notEqual"
				end

				if filter[:filterType] == "set"
					#records.where!("#{fieldName} IN (?)", filter[:values].join(","))
					records.where!("#{fieldName}": filter[:values])
				end

				records.where!("#{fieldName} = ''") if filter[:type] == "blank"
				records.where!("#{fieldName} != ''") if filter[:type] == "notBlank"

			end
		end
        return records
    end

end
