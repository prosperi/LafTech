class Performance < ApplicationRecord
   self.table_name = 'data_school_performance_measure'
   belongs_to :School, :foreign_key => [:state_lea_id, :state_school_id]
end
